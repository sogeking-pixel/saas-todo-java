
export default function CardForm({ className,children }) {
    return <div className={`p-8 space-y-6 bg-white rounded-lg shadow-xl ${className}`}>
        {children}
        </div>;
}