import { type Placement } from '@floating-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../../Button';
import { Checkbox } from '../../Checkbox';
import { Grid } from '../../Grid';
import { Select } from '../../Select';
import { Tooltip, TooltipPopover, TooltipTrigger } from '..';

const TooltipAdvancedFloating = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [flip, setFlip] = useState(true);
  const [flipCrossAxis, setFlipCrossAxis] = useState(true);
  const [shift, setShift] = useState(true);
  const [size, setSize] = useState(true);
  const [suggestedPlacement, setSuggestedPlacement] = useState<Placement>('top-start');
  const [suggestedFallbackPlacement, setSuggestedFallbackPlacement] = useState<Placement[]>([
    'top',
    'right',
    'left',
    'bottom',
  ]);

  const suggestedPlacementRef = useRef<HTMLSelectElement>(null);
  const suggestedFallbackPlacementRef = useRef<HTMLSelectElement>(null);

  const viewportRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleSuggestedPlacementChange = () => {
    if (suggestedPlacementRef.current) {
      setSuggestedPlacement((suggestedPlacementRef.current.value || 'top-start') as Placement);
    }
  };

  const handleSuggestedFallbackPlacementChange = () => {
    if (suggestedFallbackPlacementRef.current) {
      setSuggestedFallbackPlacement(
        (suggestedFallbackPlacementRef.current.value.split(',').map((item) => item.trim()) || [
          'top',
          'right',
          'left',
          'bottom',
        ]) as Placement[],
      );
    }
  };

  useEffect(() => {
    const viewport = viewportRef.current;
    const content = contentRef.current;

    const centerContentInViewport = () => {
      if (!viewport || !content) {
        return;
      }

      const scrollLeft = (content.offsetWidth - viewport.offsetWidth) / 2;
      const scrollTop = (content.offsetHeight - viewport.offsetHeight) / 2;

      viewport.scrollLeft = scrollLeft;
      viewport.scrollTop = scrollTop;
    };

    centerContentInViewport();

    window.addEventListener('resize', centerContentInViewport);

    return () => {
      window.removeEventListener('resize', centerContentInViewport);
    };
  }, []);

  return (
    <>
      <p className="mb-700">
        Try scrolling the frame or resizing the window to see how the Tooltip behaves. The Floating UI library is trying
        to keep the Tooltip in the viewport and it is also flipping, shifting and resizing the Tooltip when it is not
        possible to keep it in the viewport.
      </p>
      <Grid cols={{ mobile: 1, tablet: 2, desktop: 4 }} marginBottom="space-700" spacing="space-500">
        <Checkbox id="flip" isChecked={flip} label="Enable flipping" onChange={() => setFlip(!flip)} />
        <Checkbox
          id="flip-cross-axis"
          isChecked={flipCrossAxis}
          label="Enable flipping cross axis"
          onChange={() => setFlipCrossAxis(!flipCrossAxis)}
        />
        <Checkbox id="shift" isChecked={shift} label="Enable shifting" onChange={() => setShift(!shift)} />
        <Checkbox id="size" isChecked={size} label="Enable sizing" onChange={() => setSize(!size)} />
      </Grid>
      <Grid cols={{ mobile: 1, tablet: 2, desktop: 2 }} marginBottom="space-700">
        <Select
          id="advanced-placement"
          name="advanced-placement"
          label="Suggested placement"
          ref={suggestedPlacementRef}
          onChange={handleSuggestedPlacementChange}
          defaultValue="top-start"
        >
          <option value="top-start">top-start</option>
          <option value="top">top</option>
          <option value="top-end">top-end</option>
          <option value="right-start">right-start</option>
          <option value="right">right</option>
          <option value="right-end">right-end</option>
          <option value="bottom-start">bottom-start</option>
          <option value="bottom">bottom</option>
          <option value="bottom-end">bottom-end</option>
          <option value="left-start">left-start</option>
          <option value="left">left</option>
          <option value="left-end">left-end</option>
        </Select>
        <Select
          id="advanced-placement-fallback"
          name="advanced-placement-fallback"
          label="Suggested fallback placements"
          ref={suggestedFallbackPlacementRef}
          onChange={handleSuggestedFallbackPlacementChange}
          defaultValue="top, right, bottom"
        >
          <option value="top, right, bottom">top, right, bottom</option>
          <option value="top, left, bottom">top, left, bottom</option>
          <option value="top, left, right, bottom">top, left, right, bottom</option>
          <option value="bottom, right, top">bottom, right, top</option>
          <option value="top, bottom">top, bottom</option>
          <option value="bottom, top">bottom, top</option>
        </Select>
      </Grid>
      <div
        className="bg-secondary"
        style={{ width: '100%', maxWidth: '100%', height: '30rem', overflow: 'auto' }}
        ref={viewportRef}
      >
        <div
          style={{ position: 'relative', width: '300%', height: '90rem', paddingBlock: '44rem', textAlign: 'center' }}
          ref={contentRef}
        >
          <Tooltip
            id="tooltip-advanced-example"
            isOpen={isOpen}
            onToggle={setIsOpen}
            placement={suggestedPlacement}
            enableFlipping={flip}
            enableFlippingCrossAxis={flipCrossAxis}
            flipFallbackPlacements={suggestedFallbackPlacement}
            enableShifting={shift}
            enableSizing={size}
            trigger={['hover', 'click']}
            isDismissible
          >
            <TooltipTrigger elementType={Button}>I have a tooltip 😎</TooltipTrigger>
            <TooltipPopover>
              This long tooltip is flipping, resizing and shifting to stay in the viewport. Also its arrow is always
              trying to point to the center of the trigger.
            </TooltipPopover>
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export default TooltipAdvancedFloating;
