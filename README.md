# Styled Up

## Usage

Install it:

```bash
yarn add styled-up
```

After installation, you need to wrap you app in `StyledUp` component:

```jsx
import { StyledUp } from 'styled-up';
...

<StyledUp>
  <App />
</StyledUp>
```

## RTL

Easy! Just pass `isRTL={true}` to the main wrapper `StyledUp`:

```jsx
<StyledUp isRTL={true}>
  <App />
</StyledUp>
```

## Customizing

```javascript
import { StyledUp, variables } from 'styled-up';

// Set new values
variables.color.primary = '...';
variables.color.secondary = '...';
variables.color.tertiary = '...';
variables.font.primary = '...';
...

// Render your app like normal
<StyledUp>
  <App />
</StyledUp>
```

## Components

Coming soon...
