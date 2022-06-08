import { extendTheme } from "@chakra-ui/react"


export const theme = extendTheme({
  colors: {
    indigo: {
        "50":"#D4C2FF",
        "200":"#9871F5",
        "300":"#8257E5",
        "400": "#774FD1"
        
    },
    gray:{
        "50": "#FAFAFC",
        "100":"#E5E5E5",
        "200": "#A0A0C2",
        "300":"#C1BCCC",
        "400":"#9C98A6",
        "900":"32264D",
    },
    green:{
      "100":"#04D361",
      "800":"#04BF58",
    }
  },
  fonts: {
    heading:'Archivo',
    body:'Archivo'
  },
  styles:{
    global:{
        body: {
          backgroundColor: '#E6E6F0',
        }
    }
}
  
})