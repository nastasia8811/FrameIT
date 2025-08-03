import {useTheme} from "@/app/contextes/ThemeContext";

const Filter = () => {
    const {colors} = useTheme();
    return (
        <div className="relative ...">
            <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                </svg>
            </div>

            <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 border rounded-md w-full bg-transparent"
                style={{color: colors.primary}}
            />
        </div>
    )
}

export default Filter