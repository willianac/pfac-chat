import { Box } from "@chakra-ui/react";

type ErrorBoxProps = {
	message: string
}

function ErrorBox({ message }: ErrorBoxProps) {
	return (
		<Box bg="#ed3336" p={1} rounded={6} className="mb-3">
			<span className="block text-center text-light font-medium">{message}</span>
		</Box>
	)
}

export default ErrorBox;