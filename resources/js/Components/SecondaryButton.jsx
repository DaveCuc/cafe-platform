export default function SecondaryButton({
    type = 'button',
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            className={
                `inline-flex items-center rounded-none border-0 bg-gray-200 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-brand-ink shadow-none transition duration-150 ease-in-out hover:bg-gray-300 focus:outline-none focus:ring-0 disabled:opacity-25 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
