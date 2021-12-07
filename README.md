# Vercel Badge

![Vercel](http://therealsujitk-vercel-badge.vercel.app/?app=therealsujitk-vercel-badge) ![License](https://img.shields.io/badge/license-MIT-blue)

Include a [Vercel](http://vercel.com) deployment badge in your `README.md` file.

## Usage

For the application [`http://therealsujitk.vercel.app`](http://therealsujitk.vercel.app), the `{VERCEL_APP_NAME}` is `therealsujitk`.

### HTML

```html
<img src="https://therealsujitk-vercel-badge.vercel.app/?app={VERCEL_APP_NAME}" />
```

### Markdown

```markdown
![Vercel](https://therealsujitk-vercel-badge.vercel.app/?app={VERCEL_APP_NAME})
```

### Other Parameters

- **`?style=`** - The style of the badge. Available styles: **`flat`** (Default), **`flat-square`**, **`plastic`** & **`for-the-badge`**.
- **`?root=`** - Use this paramater if you'd like to check the deployment of a different path. Example: To check the deployment of [`http://therealsujitk.vercel.app/projects/vercel-badge`](http://therealsujitk.vercel.app/projects/vercel-badge), specify root as `projects/vercel-badge`.
- **`?logo=`** - Use this paramater if you'd like to disable the vercel logo on the badge. Available values: **`true`** (Default), **`false`**.


To combine paramaters, use **`&`**. Example:

![Vercel](http://therealsujitk-vercel-badge.vercel.app/?app=therealsujitk-vercel-badge&style=for-the-badge&logo=false)

```http
http://therealsujitk-vercel-badge.vercel.app/?app=therealsujitk-vercel-badge&style=for-the-badge&logo=false
```

## Styles

| `flat` (Default) | `flat-square` | `plastic` | `for-the-badge` |
| ---------------- | ------------- | --------- | --------------- |
| ![Vercel](/public/assets/images/logo/vercel-deployed-flat.svg) | ![Vercel](/public/assets/images/logo/vercel-deployed-flat-square.svg) | ![Vercel](/public/assets/images/logo/vercel-deployed-plastic.svg) | ![Vercel](/public/assets/images/logo/vercel-deployed-for-the-badge.svg) |
| ![Vercel](/public/assets/images/logo/vercel-not-found-flat.svg) | ![Vercel](/public/assets/images/logo/vercel-not-found-flat-square.svg) | ![Vercel](/public/assets/images/logo/vercel-not-found-plastic.svg) | ![Vercel](/public/assets/images/logo/vercel-not-found-for-the-badge.svg) |
| ![Vercel](/public/assets/images/logo/vercel-failed-flat.svg) | ![Vercel](/public/assets/images/logo/vercel-failed-flat-square.svg) | ![Vercel](/public/assets/images/logo/vercel-failed-plastic.svg) | ![Vercel](/public/assets/images/logo/vercel-failed-for-the-badge.svg) |
