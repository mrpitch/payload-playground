const css = `
  html[data-theme="dark"] .text {
    fill: #0C0C0C;
  }

  html[data-theme="dark"] .bg {
    fill: white;
  }

  .graphic-icon {
    width: 25px;
    height: 25px;
  }
`

const Icon = () => {
	// const baseStyles = {
	// 	default: 'w-11 h-11 bg-primary rounded-full p-0.5',
	// }

	return (
		<svg
			className="graphic-icon"
			width="100%"
			height="100%"
			viewBox="0 0 82 100"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<style>{css}</style>
			<path
				d="M45.4 19.5V7H6V92.8824H45.4V80.3824C37.3289 80.3824 29.5882 77.175 23.8812 71.4662C18.1741 65.7574 14.9679 58.0147 14.9679 49.9412C14.9679 41.8677 18.1741 34.1247 23.8812 28.416C29.5882 22.7072 37.3289 19.5 45.4 19.5Z"
				fill="currentColor"
			/>
			<path
				d="M45.3999 19.5V80.3824C53.471 80.3824 61.2117 77.175 66.9188 71.4662C72.6259 65.7574 75.832 58.0147 75.832 49.9412C75.832 41.8677 72.6259 34.1247 66.9188 28.416C61.2117 22.7072 53.471 19.5 45.3999 19.5Z"
				fill="currentColor"
			/>
		</svg>
	)
}

export default Icon
