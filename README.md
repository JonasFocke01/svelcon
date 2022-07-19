# Svelcon

A component library for Svelte

# Components

The components are scructured in Folders to organize them

- Input
  - Checkbox
  - Date
  - Dropown
  - Button
  - Password
  - RadioGroup
  - Textarea
  - Textfield
  - SegmentedInput
- Wrapper
  - Card
  - InplacePopup
  - List
  - MediaQuery
  - Table
  - Text

# style

All conponents are styled and will inherit your website scheme.

Your `tailwind.config.cjs` file should look like this:

`
module.exports = { 
  content: [ 
    './src/**/*.{html,js,svelte,ts}', 
    './node_modules/@jonas_focke/**/*.{html,js,svelte,ts}' 
  ], 
  theme: 
  { 
    colors: { 
      primary: '#0044ae', 
      secondary: '#02adff', 
      accent: '#ff8c00', 
      success: '#4dea3f', 
      warning: '#f4bb50', 
      error: '#f74838', 
      info: '#62acfc', 
      surface: '#006bc6', 
      text: '#ffffff', 
      black: '#000000' 
    }, 
    extend: {} 
    } 
  }, 
  plugins: [] 
}; `

# publishing

The publishing workflow is fully done by a github action.
All you need to do is to push code to master.