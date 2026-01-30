import React from 'react'

export default function RuleType({ icon, title, children }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <div className="font-semibold">{title}</div>
        <div>{children}</div>
      </div>
    </div>
  )
}
