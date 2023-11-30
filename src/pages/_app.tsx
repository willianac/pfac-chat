import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
	colors: {
		primary: {
			50: "#FFFBEB",
			100: "#FFF5CC",
			200: "#FFE699",
			300: "#FFD966",
			400: "#FFCC33",
			500: "#FFBF00",
			600: "#FFB300",
			700: "#FFA600",
			800: "#FF9900",
			900: "#FF8C00",
	 }
 }
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<Component {...pageProps} />
		</ChakraProvider>
	)
}
