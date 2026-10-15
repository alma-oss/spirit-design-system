import { Icon } from '@alma-oss/spirit-web-react';
import { type CSSProperties } from 'react';
import MarqueeRow from './MarqueeRow';
import { type TokenChip, tokenRows } from './tokenChips';
import styles from './TokenMarquee.module.scss';

const swatchStyle = ({ kind, css }: TokenChip): CSSProperties => {
  switch (kind) {
    case 'color':
      return { '--swatch-color': css } as CSSProperties;
    case 'gradient':
      return { background: css };
    case 'border':
      return { borderWidth: css };
    default:
      return {};
  }
};

const Preview = ({ chip }: { chip: TokenChip }) => {
  if (chip.kind === 'typography') {
    // eslint-disable-next-line @next/next/no-img-element -- decorative static SVG
    return <img src="/design-hero/aa.svg" alt="" width={33} height={20} />;
  }

  if (chip.kind === 'icon' && chip.icon) {
    return <Icon name={chip.icon} boxSize={24} />;
  }

  if (chip.kind === 'illustration' && chip.image) {
    // eslint-disable-next-line @next/next/no-img-element -- decorative static image
    return <img className={styles.Illustration} src={chip.image} alt="" width={30} height={30} />;
  }

  return <span className={`${styles.Swatch} ${styles[`Swatch--${chip.kind}`]}`} style={swatchStyle(chip)} />;
};

const Chip = ({ chip }: { chip: TokenChip }) => (
  <li className={styles.Chip}>
    <Preview chip={chip} />
    <span className={styles.Label}>
      {chip.name}
      {chip.value && (
        <>
          <span className={styles.Value} aria-hidden="true">
            •
          </span>
          <span className={styles.Value}>{chip.value}</span>
        </>
      )}
    </span>
  </li>
);

/** Decorative rows of real Spirit tokens, each row drifts endlessly in alternating directions. */
const TokenMarquee = () => (
  <div className={styles.Marquee} aria-hidden="true">
    {tokenRows.map((row, index) => (
      <MarqueeRow key={row[0]?.name} isReversed={index % 2 === 1}>
        {/* The set is rendered twice, so the animation can loop by exactly one set width without a jump. */}
        {[0, 1].map((copy) => (
          <ul key={copy} className={styles.Track}>
            {row.map((chip) => (
              <Chip key={chip.name} chip={chip} />
            ))}
          </ul>
        ))}
      </MarqueeRow>
    ))}
  </div>
);

export default TokenMarquee;
