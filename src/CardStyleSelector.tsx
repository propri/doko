import React, { useContext, ChangeEvent } from 'react'
import CardStyleContext, { CardStyle, CardStyles } from './CardStyleContext'

const CardStyleSelector = () => {
  const { style, saveStyle } = useContext(CardStyleContext) ?? {}

  if (!style || !saveStyle) {
    return null
  }

  const updateStyle = (ev: ChangeEvent<HTMLSelectElement>) => {
    saveStyle(ev.target.value as CardStyle)
    console.log(ev.target.value)
  }

  return (
    <div className="selectCardStyle">
      <select onChange={updateStyle}>
        {CardStyles.map((cs) => (
          <option value={cs} key={cs} selected={cs === style}>
            {cs}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CardStyleSelector
