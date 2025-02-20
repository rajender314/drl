import * as React from 'react';
import './styles.css';

import { StepStates, ProgressStep, StepProgressProps, ReducerAction } from './models';

function stepsReducer(steps: ProgressStep[], action: ReducerAction): ProgressStep[] {

  return steps.map(function (step, i) {

    if (i < action.payload.index) {
      step.state = StepStates.COMPLETED;
    } else if (i === action.payload.index) {
      step.state = action.payload.state;
    } else {
      step.state = StepStates.NOT_STARTED;
    }
    return step;
  });
}

function StepProgressBar(props: StepProgressProps): JSX.Element {
  const {
    steps,
    startingStep,
    wrapperClass,
    progressClass,
    stepClass,
    labelClass,
    subtitleClass,
    contentClass,
    buttonWrapperClass,
    primaryBtnClass,
    secondaryBtnClass,
    submitBtnName,
    onSubmit,
    previousBtnName,
    nextBtnName,
    showLabel,
  } = props;
  const [state, dispatch] = React.useReducer(stepsReducer, steps);
  const [currentIndex, setCurrentIndex] = React.useState(startingStep);

  React.useEffect(function () {
    dispatch({
      type: 'init',
      payload: { index: currentIndex, state: StepStates.CURRENT }
    });
  }, []);

  function submitHandler(): void {
    onSubmit();
  }

  function nextHandler(): void {

    if (currentIndex === steps.length - 1) {
      return;
    }
    let isStateValid = true;
    const stepValidator = state[currentIndex].validator;

    if (stepValidator) {
      isStateValid = stepValidator();
    }
    dispatch({
      type: 'next',
      payload: {
        index: isStateValid ? currentIndex + 1 : currentIndex,
        state: isStateValid ? StepStates.CURRENT : StepStates.ERROR
      }
    });

    if (isStateValid) {
      setCurrentIndex(currentIndex + 1);
    }
  }

  function prevHandler(): void {

    if (currentIndex === 0) {
      return;
    }

    dispatch({
      type: 'previous',
      payload: {
        index: currentIndex - 1,
        state: StepStates.CURRENT
      }
    });
    setCurrentIndex(currentIndex - 1);
  }

  return (
    <div className={`${['progress-bar-wrapper']} ${wrapperClass || ''}`}>
      <ul className={`${['step-progress-bar']} ${progressClass || ''}   ${window.location.href.includes('orders') ? ' orderTrack' : ''}`} >

        {state.map(function (step, i) {
          return (
            <li
              key={i}
              className={`${['progress-step ']}${step.state === StepStates.COMPLETED ? ` ${'completed'}` : ''
                }${step.state === StepStates.CURRENT ? ` ${'current'}` : ''}${step.state === StepStates.ERROR ? ` ${['has-error']}` : ''
                } ${stepClass || ''}${step.subtitleWithCode ? ` ${'subtitle-with-code'}` : ''} ${step.detail ? `${' p-30'}` : ''}`}
            >
              {step.state === StepStates.COMPLETED && (
                <span className={`${'step-icon'} ${(step.reviewStep) ? 'review-icon' : ''}`}>
                  {(step.reviewStep == true) ? <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.47852 11.0337C6.22689 11.0337 6.9314 10.8894 7.59204 10.601C8.25269 10.3125 8.83545 9.91406 9.34033 9.40565C9.84521 8.89724 10.2409 8.3104 10.5273 7.64513C10.8138 6.97987 10.957 6.27043 10.957 5.51683C10.957 4.76322 10.8138 4.05379 10.5273 3.38852C10.2409 2.72326 9.84521 2.13642 9.34033 1.628C8.83545 1.11959 8.25179 0.721154 7.58936 0.432692C6.92692 0.144231 6.22152 0 5.47314 0C4.72477 0 4.02026 0.144231 3.35962 0.432692C2.69897 0.721154 2.11711 1.11959 1.61401 1.628C1.11092 2.13642 0.716146 2.72326 0.429688 3.38852C0.143229 4.05379 0 4.76322 0 5.51683C0 6.27043 0.143229 6.97987 0.429688 7.64513C0.716146 8.3104 1.11182 8.89724 1.6167 9.40565C2.12158 9.91406 2.70435 10.3125 3.36499 10.601C4.02563 10.8894 4.73014 11.0337 5.47852 11.0337ZM5.47852 10.1142C4.84473 10.1142 4.25212 9.99519 3.70068 9.75721C3.14925 9.51923 2.66496 9.1902 2.2478 8.77013C1.83065 8.35006 1.5048 7.86238 1.27026 7.30709C1.03573 6.7518 0.918457 6.15505 0.918457 5.51683C0.918457 4.87861 1.03573 4.28185 1.27026 3.72656C1.5048 3.17127 1.82975 2.68269 2.24512 2.26082C2.66048 1.83894 3.14388 1.50992 3.69531 1.27374C4.24675 1.03756 4.83936 0.919471 5.47314 0.919471C6.10693 0.919471 6.69954 1.03756 7.25098 1.27374C7.80241 1.50992 8.2876 1.83894 8.70654 2.26082C9.12549 2.68269 9.45312 3.17127 9.68945 3.72656C9.92578 4.28185 10.0439 4.87861 10.0439 5.51683C10.0439 6.15505 9.92668 6.7518 9.69214 7.30709C9.4576 7.86238 9.13175 8.35006 8.7146 8.77013C8.29744 9.1902 7.81226 9.51923 7.25903 9.75721C6.70581 9.99519 6.1123 10.1142 5.47852 10.1142ZM5.47314 6.49579C5.7417 6.49579 5.87777 6.35336 5.88135 6.06851L5.96191 3.21274C5.9655 3.07572 5.91984 2.96124 5.82495 2.86929C5.73006 2.77734 5.611 2.73137 5.46777 2.73137C5.32096 2.73137 5.2019 2.77644 5.1106 2.86659C5.01929 2.95673 4.97542 3.07031 4.979 3.20733L5.04883 6.06851C5.05599 6.35336 5.19743 6.49579 5.47314 6.49579ZM5.47314 8.25361C5.62712 8.25361 5.76229 8.19952 5.87866 8.09135C5.99504 7.98317 6.05322 7.84976 6.05322 7.69111C6.05322 7.53245 5.99593 7.39904 5.88135 7.29087C5.76676 7.18269 5.6307 7.12861 5.47314 7.12861C5.31559 7.12861 5.17952 7.18359 5.06494 7.29357C4.95036 7.40355 4.89307 7.53606 4.89307 7.69111C4.89307 7.84615 4.95036 7.97867 5.06494 8.08864C5.17952 8.19862 5.31559 8.25361 5.47314 8.25361Z" fill="white" />
                  </svg>
                    : ''}

                  {(!step.reviewStep) ? <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.25 3.5483L3.57422 6.6875L8.6875 1.375" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg> : ''}
                </span>
              )}
              {step.state === StepStates.ERROR && <span className={'step-icon'}>!</span>}
              {step.state !== StepStates.COMPLETED && step.state !== StepStates.ERROR && (
                <span className={'step-index'}>
                  <svg width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="2.5" cy="2.5" r="2.5" fill="white" />
                  </svg>


                </span>
              )}
              {showLabel && <div className={`${'step-label det'} ${labelClass || ''} ${(step.reviewStep) ? 'step-label-review' : ''} `}>
                <span style={{ display: 'block', textTransform: 'uppercase', marginBottom: '6px', lineHeight: '1' }}>{step.label}</span>
                {step.content && (
                  <div className={`${['step-label-subtitle det']} ${subtitleClass || ''}`}>
                    {step.content}
                  </div>
                )}
                {step.detail && (
                  <div className={`${['step-label-subtitle det num']} ${subtitleClass || ''}`}>
                    {step.detail['name'] ? step.detail['name'] : ''}{' '}{step.detail['supportNumber'] ? step.detail['supportNumber'] : ''}
                  </div>
                )}
                {step.subtitle && (

                  <>
                    {step.subtitleWithCode && (
                      <div className="titlewithcode">{step.subtitleWithCode}</div>
                    )}
                    <div className={`${['step-label-subtitle det']} ${subtitleClass || ''}`}>
                      {step.subtitle}{step.subtitleWithCode ? "-" : ""}{step.subtitleWithCode}
                    </div>
                  </>
                )}
              </div>}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default StepProgressBar