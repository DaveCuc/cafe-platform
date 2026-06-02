export const DataCard = ({ value, label, shouldFormat }) => {
  const formatPrice = (p) => new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(p);

  return (
    <div className="rounded-none border bg-white shadow-sm overflow-hidden">
      <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="tracking-tight text-sm font-medium text-brand-ink">
          {label}
        </h3>
      </div>
      <div className="p-6 pt-0">
        <div className="text-2xl font-bold">
          {shouldFormat ? formatPrice(value) : value}
        </div>
      </div>
    </div>
  )
}
