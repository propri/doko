import React, { useState, createContext, PropsWithChildren } from 'react'

export const CardStyles = [
  'ancient_french',
  'atlasnye_skat',
  'lattmann',
  'oga',
  'paris-text',
  'rheinland',
  'tango_nuevo',
] as const

export type CardStyle = (typeof CardStyles)[number]

const defaultStyle: CardStyle = 'oga'

type StyleContextType = {
  saveStyle: (style: CardStyle) => void
  style: CardStyle
}

const CardStyleContext = createContext<StyleContextType | null>(null)

export const CardStyleProvider = ({
  value,
  children,
}: PropsWithChildren & { value?: CardStyle }) => {
  const [style, setStyle] = useState<CardStyle>(value || defaultStyle)

  const saveStyle = (newStyle: CardStyle) => {
    setStyle(newStyle)
  }

  return (
    <CardStyleContext.Provider value={{ style, saveStyle }}>
      {children}
    </CardStyleContext.Provider>
  )
}

export const SettingsConsumer = CardStyleContext.Consumer

export default CardStyleContext
