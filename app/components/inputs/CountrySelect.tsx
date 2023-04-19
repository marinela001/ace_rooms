import useCountries from '@/app/hooks/useCountries'
import { CountrySelectValue } from '@/app/types'
import React from 'react'
import Select from 'react-select'
interface CountrySelectProps{

  value?:CountrySelectValue,
  onChange:(value:CountrySelectValue)=>void
}
const CountrySelect : React.FC<CountrySelectProps>=({
value,
onChange
}) => {


  const {getAll} = useCountries()
  return (
    <div>
      <Select
      placeholder="Aywhere"
      options={getAll()}
      isClearable
      value={value}
      onChange={(value)=>onChange(value as CountrySelectValue)}

      formatOptionLabel={(option: any) => (
        <div className="
        flex flex-row items-center gap-3">
          <div>{option.flag}</div>
          <div>
            {option.label},
            <span className="text-neutral-500 ml-1">
              {option.region}
            </span>
          </div>
        </div>
      )}
      theme={(theme)=>({
        ...theme,
        borderRadius:6,
        colors:{
          ...theme.colors,
          primary:'black',

        }

      })
    }
      />
    </div>
  )
}

export default CountrySelect
