## Description

Presenting a react-based approach to work around flex layout's deficiency in expanding flex column-wrap div's, outlined here:
https://stackoverflow.com/questions/33891709/when-flexbox-items-wrap-in-column-mode-container-does-not-grow-its-width

View the demo <a href="https://codesandbox.io/s/react-flex-column-wrap-demo-6y9348">here</a>.

## Example

```javascript
import Column from "react-column-flex-wrap";
//...

function render(children) {
  const ref = useRef(null);
  //...

  return (
    <Column
      className="optional-class-name"
      constantWidth
      style={style}
      ref={ref}
    >
      {...children}
    </Column>
  );
}
```

## Documentation

The core component's width is set by tabulating its children's dimensions. It will override display and flex-direction to `column` and `wrap` by default, but supports `column-reverse` and `wrap-reverse` if passed in via styles or a css class.

Important! The column's max-height or height has to be specified via styles or css class, in px, %, vh, vw, em or rem.

Optional props:
<br />• `className: string` - class name conferring styles
<br />• `styles: CSSProperties` - styles
<br />• `constantWidth: boolean` - take the width of the first child as reference for the others, thereby saving on computation.
<br />• `constantHeight: boolean` - take the height of the first child as reference for the others, thereby saving on computation.
<br />• `dependencies: any[]` - dependencies for the core hook
<br />• `effectOn: boolean` - boolean to toggle the effect
<br />• `ref: React.MutableRefObject<any>` - ref to be forwarded to the component
<br />• `id: string`
<br />• `key: string`
