'use client';

/* eslint-disable @next/next/no-img-element -- decorative static SVG and PNG images from the public folder */

import { Lottie } from 'lottie-react';
import { useEffect, useRef } from 'react';
import styles from './FallingTokens.module.scss';

const ASSETS = '/falling-tokens';

// The cards never rotate more than this, so the text stays readable.
const MAX_ANGLE = (30 * Math.PI) / 180;
const WALL_THICKNESS = 200;
const CARD_RADIUS = 12;
const CARD_GAP = 24;
// Free space around each card in the physics, so the neighbouring cards never touch.
const CARD_MARGIN = 2;
// How far above the scene the cards may pile up. It matches the gap above the scene (`space-1300`, 56 px).
const CEILING_OFFSET = 56;
// Below this width of the scene the cards are scaled down proportionally, so there are enough of them on a phone.
const FULL_SIZE_WIDTH = 640;
// The cards can be moved only by a mouse on a screen that is not a phone. On a phone they just fall and stay.
const DRAG_QUERY = '(pointer: fine) and (min-width: 48rem)';

const joinClassNames = (...classNames: (string | false)[]) => classNames.filter(Boolean).join(' ');

/**
 * Cards with design tokens that fall to the bottom of the section and pile up there.
 * The physics runs on Matter.js, which is loaded lazily once the section is scrolled into view.
 * Users who prefer reduced motion get the cards lying still.
 */
const FallingTokens = () => {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;

    if (!stage) {
      return undefined;
    }

    let stopPhysics = () => {};
    let isCancelled = false;

    const getCards = () => [...stage.querySelectorAll<HTMLElement>('[data-token-card]')];

    const getScale = () => Math.min(1, stage.clientWidth / FULL_SIZE_WIDTH);

    // Cards lying in rows at the bottom of the section, without any physics.
    const layoutStatically = () => {
      const scale = getScale();
      let x = CARD_GAP;
      let rowHeight = 0;
      const rows: { el: HTMLElement; x: number; fullWidth: number; fullHeight: number }[][] = [[]];

      getCards().forEach((el) => {
        const { offsetWidth: fullWidth, offsetHeight: fullHeight } = el;
        const width = fullWidth * scale;

        if (x + width > stage.clientWidth - CARD_GAP && rows[rows.length - 1].length > 0) {
          rows.push([]);
          x = CARD_GAP;
        }

        rows[rows.length - 1].push({ el, x, fullWidth, fullHeight });
        x += width + CARD_GAP;
        rowHeight = Math.max(rowHeight, fullHeight * scale);
      });

      rows.forEach((row, rowIndex) => {
        const y = stage.clientHeight - (rows.length - rowIndex) * (rowHeight + CARD_GAP / 2);
        row.forEach(({ el, x: left, fullWidth, fullHeight }) => {
          // The scaling is done around the center of the card, so the box is moved by half of the difference.
          el.style.transform = `translate(${left - (fullWidth * (1 - scale)) / 2}px, ${y - (fullHeight * (1 - scale)) / 2}px) scale(${scale})`;
        });
      });
    };

    // Matter.js and the font are loaded in advance, so the cards start falling without a hitch once they are in view.
    const matterPromise = import('matter-js');

    const startPhysics = async () => {
      const [{ default: Matter }] = await Promise.all([matterPromise, document.fonts.ready]); // card sizes are measured after the font is loaded

      if (isCancelled) {
        return;
      }

      const { Engine, Runner, Bodies, Body, Composite, Mouse, MouseConstraint, Events } = Matter;
      const engine = Engine.create();
      const runner = Runner.create();

      // The floor and the side walls are invisible. The cards fall from above, so the ceiling is added later, once they
      // are all in the scene. It keeps the pile and the cards thrown by the mouse from going too high.
      let walls: Matter.Body[] = [];
      let hasCeiling = false;
      const buildWalls = () => {
        Composite.remove(engine.world, walls);
        const width = stage.clientWidth;
        const height = stage.clientHeight;
        walls = [
          Bodies.rectangle(width / 2, height + WALL_THICKNESS / 2, width * 3, WALL_THICKNESS, { isStatic: true }),
          Bodies.rectangle(-WALL_THICKNESS / 2, 0, WALL_THICKNESS, height * 6, { isStatic: true }),
          Bodies.rectangle(width + WALL_THICKNESS / 2, 0, WALL_THICKNESS, height * 6, { isStatic: true }),
          ...(hasCeiling
            ? [
                Bodies.rectangle(width / 2, -CEILING_OFFSET - WALL_THICKNESS / 2, width * 3, WALL_THICKNESS, {
                  isStatic: true,
                }),
              ]
            : []),
        ];
        Composite.add(engine.world, walls);
      };
      buildWalls();

      // The cards start in rows above the section, so they do not overlap. The cards of each row are spread over the
      // whole width, so they land next to each other and do not pile up on one side.
      const scale = getScale();
      const rows: { el: HTMLElement; width: number; height: number; fullWidth: number; fullHeight: number }[][] = [[]];
      let rowWidth = 0;
      getCards().forEach((el) => {
        const { offsetWidth: fullWidth, offsetHeight: fullHeight } = el;
        const width = fullWidth * scale;
        const height = fullHeight * scale;

        if (rowWidth + width > stage.clientWidth - 2 * CARD_GAP && rows[rows.length - 1].length > 0) {
          rows.push([]);
          rowWidth = 0;
        }

        rows[rows.length - 1].push({ el, width, height, fullWidth, fullHeight });
        rowWidth += width + CARD_GAP;
      });

      let y = -40;
      const items = rows.flatMap((row) => {
        const rowHeight = Math.max(...row.map(({ height }) => height));
        const free = stage.clientWidth - 2 * CARD_GAP - row.reduce((sum, { width }) => sum + width, 0);
        const spacing = row.length > 1 ? free / (row.length - 1) : 0;
        let x = row.length > 1 ? CARD_GAP : (stage.clientWidth - row[0].width) / 2;
        y -= rowHeight;

        const rowItems = row.map(({ el, width, height, fullWidth, fullHeight }) => {
          const body = Bodies.rectangle(
            x + width / 2,
            y + (rowHeight - height) / 2,
            width + 2 * CARD_MARGIN,
            height + 2 * CARD_MARGIN,
            {
              chamfer: { radius: CARD_RADIUS + CARD_MARGIN },
              angle: (Math.random() - 0.5) * 0.6,
              restitution: 0.2,
              friction: 0.6,
            },
          );
          x += width + spacing;

          return { el, body, fullWidth, fullHeight };
        });
        y -= 40;

        return rowItems;
      });
      Composite.add(
        engine.world,
        items.map(({ body }) => body),
      );

      // Dragging the cards is for the mouse only, on touch devices it would block the scrolling.
      const canDrag = window.matchMedia(DRAG_QUERY).matches;
      if (canDrag) {
        const mouse = Mouse.create(stage);
        // The mouse wheel stays with the page. The handler is not typed, but Matter registers it on the element.
        const { mousewheel } = mouse as unknown as { mousewheel: EventListener };
        mouse.element.removeEventListener('mousewheel', mousewheel);
        mouse.element.removeEventListener('DOMMouseScroll', mousewheel);

        const drag = MouseConstraint.create(engine, {
          mouse,
          constraint: { stiffness: 0.2, render: { visible: false } },
        });
        Composite.add(engine.world, drag);
        Events.on(drag, 'startdrag', () => stage.classList.add(styles.isDragging));
        Events.on(drag, 'enddrag', () => stage.classList.remove(styles.isDragging));
      }

      let calmFrames = 0;
      Events.on(engine, 'afterUpdate', () => {
        items.forEach(({ el, body, fullWidth, fullHeight }) => {
          if (Math.abs(body.angle) > MAX_ANGLE) {
            Body.setAngle(body, Math.sign(body.angle) * MAX_ANGLE);
            Body.setAngularVelocity(body, 0);
          }

          el.style.transform = `translate(${body.position.x - fullWidth / 2}px, ${body.position.y - fullHeight / 2}px) rotate(${body.angle}rad) scale(${scale})`;
        });

        // All the cards are in the scene (or in the free space above it), so the ceiling can be added.
        if (!hasCeiling && items.every(({ body }) => body.bounds.min.y >= -CEILING_OFFSET)) {
          hasCeiling = true;
          buildWalls();
        }

        // The cards that cannot be moved are frozen once they have settled, so they stop using the processor.
        if (!canDrag && hasCeiling) {
          calmFrames = items.every(({ body }) => body.speed < 0.1 && body.angularSpeed < 0.01) ? calmFrames + 1 : 0;

          if (calmFrames > 60) {
            Runner.stop(runner);
          }
        }
      });

      const resizeObserver = new ResizeObserver(buildWalls);
      resizeObserver.observe(stage);

      Runner.run(runner, engine);

      stopPhysics = () => {
        resizeObserver.disconnect();
        Runner.stop(runner);
        Composite.clear(engine.world, false);
        Engine.clear(engine);
      };
    };

    const start = () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.fonts.ready.then(layoutStatically);

        return;
      }

      startPhysics();
    };

    // The cards fall when the section gets into view, otherwise nobody would see it.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          start();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(stage);

    return () => {
      isCancelled = true;
      observer.disconnect();
      stopPhysics();
    };
  }, []);

  return (
    // Decorative, the cards are not read out and only the mouse can move them.
    <div ref={stageRef} className={styles.stage} aria-hidden="true">
      <div className={joinClassNames(styles.card, styles.hero, styles.font, 'theme-light-on-brand')} data-token-card>
        <img src={`${ASSETS}/aa-font-family.svg`} width={93} height={56} alt="" />
        <span className={styles.label}>font-family</span>
      </div>

      <div className={joinClassNames(styles.card, styles.space)} data-token-card>
        <div className={styles.spaceDemo} />
        <span className={styles.label}>space-1000</span>
      </div>

      <div className={joinClassNames(styles.card, styles.column)} data-token-card>
        <div className={joinClassNames(styles.radiusDemo, styles.radius300)} />
        <span className={styles.label}>radius-300</span>
      </div>

      <div className={styles.card} data-token-card>
        <img className={styles.icon} src={`${ASSETS}/letter-spacing.svg`} width={30} height={30} alt="" />
        <span className={styles.label}>letter-spacing</span>
      </div>

      <div className={styles.card} data-token-card>
        <img className={styles.icon} src={`${ASSETS}/line-height.svg`} width={30} height={30} alt="" />
        <span className={styles.label}>line-height</span>
      </div>

      <div className={joinClassNames(styles.card, styles.column)} data-token-card>
        <div className={styles.radiusDemo} />
        <span className={styles.label}>radius-none</span>
      </div>

      <div className={styles.card} data-token-card>
        <div className={joinClassNames(styles.swatch, styles.gradient)} />
        <span className={styles.label}>gradient-primary</span>
      </div>

      <div className={styles.card} data-token-card>
        <div className={styles.containerDemo} />
        <span className={styles.label}>container-xlarge-max-width</span>
      </div>

      <div className={joinClassNames(styles.card, styles.colorCard)} data-token-card>
        <div className={joinClassNames(styles.swatchBar, styles.green)} />
        <div className={styles.text}>
          <span className={styles.label}>green-1000</span>
          <span className={styles.hex}>#3E9B4F</span>
        </div>
      </div>

      <div className={joinClassNames(styles.card, styles.image)} data-token-card>
        <img src={`${ASSETS}/gradient.png`} width={110} height={110} alt="" />
      </div>

      <div className={joinClassNames(styles.card, styles.colorCard)} data-token-card>
        <div className={joinClassNames(styles.swatchBar, styles.yellow)} />
        <div className={styles.text}>
          <span className={styles.label}>yellow-1000</span>
          <span className={styles.hex}>#FFBE00</span>
        </div>
      </div>

      <div className={joinClassNames(styles.card, styles.colorCard)} data-token-card>
        <div className={styles.gridDemo}>
          {Array.from({ length: 10 }, (_, index) => (
            <span key={index} />
          ))}
        </div>
        <span className={styles.label}>grid-12col</span>
      </div>

      <div className={styles.card} data-token-card>
        <div className={joinClassNames(styles.swatch, styles.warning)} />
        <span className={styles.label}>emotion-warning</span>
      </div>

      <div className={joinClassNames(styles.card, styles.hero, styles.display, 'theme-light-on-brand')} data-token-card>
        <img src={`${ASSETS}/aa-display.svg`} width={93} height={47} alt="" />
        <span className={styles.label}>Display</span>
      </div>

      <div className={styles.card} data-token-card>
        <img src={`${ASSETS}/icon-link.svg`} width={24} height={24} alt="" />
        <span className={styles.label}>icon-link</span>
      </div>

      <div className={joinClassNames(styles.card, styles.column)} data-token-card>
        <div className={joinClassNames(styles.radiusDemo, styles.radiusFull)} />
        <span className={styles.label}>radius-full</span>
      </div>

      <div className={joinClassNames(styles.card, styles.hero, styles.accessibility)} data-token-card>
        <img src={`${ASSETS}/accessibility.svg`} width={44} height={44} alt="" />
        <span className={styles.label}>Accessibility</span>
      </div>

      <div className={joinClassNames(styles.card, styles.hero, styles.bodyXlarge)} data-token-card>
        <img src={`${ASSETS}/aa-body-xlarge.svg`} width={45} height={27} alt="" />
        <span className={styles.label}>Body XLarge</span>
      </div>

      <div className={joinClassNames(styles.card, styles.column, styles.motion)} data-token-card>
        {/* The animation has an empty margin, so it is drawn larger than its box and cropped by it. */}
        <div className={styles.lottieBox}>
          <Lottie src="/lottie/confetti.json" autoplay loop className={styles.lottie} />
        </div>
        <div className={joinClassNames(styles.text, styles.textCentered)}>
          <span className={styles.label}>Motion</span>
          <span className={styles.hex}>Confetti</span>
        </div>
      </div>
    </div>
  );
};

export default FallingTokens;
