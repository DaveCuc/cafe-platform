export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded-none border-0 bg-gray-100 text-brand shadow-none focus:ring-0 ' +
                className
            }
        />
    );
}
