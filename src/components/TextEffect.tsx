import { CSSProperties, FC, useEffect, useRef } from 'react';

export type TypingText = {
  text: string;
  styles?: CSSProperties;
  fontSize?: number;
  className?: string;
};

export type TextEffectProps = {
  staticText?: string;
  wrapperStyle?: CSSProperties;
  typingTextItems: TypingText[];
};

const TextEffect: FC<TextEffectProps> = ({
  staticText,
  wrapperStyle,
  typingTextItems,
}) => {
  const typingTextContainerRef = useRef<HTMLDivElement>(null);
  const isAdding = useRef(false);
  const currIndex = useRef(0);

  useEffect(() => {
    let timer: any;
    const playAnimation = () => {
      timer = setTimeout(() => {
        const idx = currIndex.current;
        const currentText = typingTextItems[idx];
        if (typingTextContainerRef.current && currentText) {
          const text = currentText?.text;
          typingTextContainerRef.current.innerText = text.slice(0, idx);
          if (isAdding.current) {
            if (idx > text.length) {
              isAdding.current = false;
              setTimeout(playAnimation, 2000);
              return;
            } else {
              currIndex.current += 1;
            }
          }
        } else {
          if (currIndex.current === 0) {
            isAdding.current = true;
          }
        }
      }, 0);
    };

    return () => {
      clearTimeout(timer);
    };
  }, [typingTextItems]);

  return (
    <div className="text-typing-wrapper" style={wrapperStyle}>
      {staticText ? (
        <div className="text-typing-static">{staticText}</div>
      ) : null}
      <div className="text-typing-items">
        <div ref={typingTextContainerRef} />
      </div>
    </div>
  );
};

export { TextEffect };
