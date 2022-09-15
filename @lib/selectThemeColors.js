// ** React Select Theme Colors
export const selectThemeColors = theme => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary25: '#f7f7ff', // for option hover bg-color
      primary: 'var(--bs-primary)', // for selected option bg-color
      neutral10: 'var(--bs-primary)', // for tags bg-color
      neutral20: '#e1e1ed', // for input border-color
      neutral30: '#e1e1ed' // for input hover border-color
    }
  })