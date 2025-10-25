interface ChipProps {
    children: React.ReactNode
    color?: "success" | "warning"
}
const Chip: React.FC<ChipProps> = ({ children, color = "secondary" }) => {
    return (
        <span className={`px-5 py-1 rounded  ${color === "success" ? "text-[#7AF1A8]  bg-[#DCFCE6]" : "bg-[#fff1e2] text-[#ffba6b]"}`}>
            {children}
        </span>
    )
}

export default Chip