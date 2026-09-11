import React, { useState } from 'react';
import { Button } from '../../Button';
import { Tooltip, TooltipPopover, TooltipTrigger } from '..';

const TooltipInsideForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerCount, setTriggerCount] = useState(0);
  const [submitCount, setSubmitCount] = useState(0);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmitCount((count) => count + 1);
  };

  return (
    <>
      <p>Clicking the tooltip trigger does not submit the form.</p>

      <form className="docs-Stack docs-Stack--start" onSubmit={handleSubmit}>
        <Tooltip
          id="tooltip-in-form"
          isOpen={isOpen}
          onToggle={setIsOpen}
          trigger={['click']}
          placement="right"
          flipFallbackPlacements={['bottom']}
        >
          <TooltipTrigger elementType={Button} onClickCapture={() => setTriggerCount((count) => count + 1)}>
            Tooltip inside a form
          </TooltipTrigger>
          <TooltipPopover>Hello there!</TooltipPopover>
        </Tooltip>

        <Button type="submit" color="secondary">
          Submit the form
        </Button>
      </form>

      <p>
        Tooltip trigger clicks: <strong>{triggerCount}</strong>, form submits: <strong>{submitCount}</strong>
      </p>
    </>
  );
};

export default TooltipInsideForm;
