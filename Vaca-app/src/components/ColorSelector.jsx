import React from 'react';

const ColorSelector = ({ group, setGroup }) => {
    const style = {
        colorsFieldset: `grid grid-cols-4 
    justify-items-center content-around 
    border-slate-400 border-2 rounded-md 
    p-2 `,
        coloroButton: `h-12 w-12 cursor-pointer 
    rounded-md border-slate-300 border-2
    focus:ring-0 
    active:border-sky-600`,
    };
    const colorOptionsObject = [
        { name: 'purple', hex: '#A65293' },
        {
            name: 'green',
            hex: '#6EAB63',
        },
        {
            name: 'brown',
            hex: '#9D5239',
        },
        {
            name: 'blue',
            hex: '#2b92E4',
        },
        {
            name: 'white',
            hex: '#FFF',
        },
        {
            name: 'yellow',
            hex: '#FFA830',
        },
        {
            name: 'pink',
            hex: '#FEA3E2',
        },
        {
            name: 'red',
            hex: '#FF131E',
        },
    ];

    return (
        <fieldset className={style.colorsFieldset}>
            {colorOptionsObject.map((color) => {
                return (
                    <div key={color['name'] + ' pickButon'}>
                        <button
                            type="button"
                            style={{ backgroundColor: color['hex'] }}
                            className={
                                color.hex === group?.color
                                    ? style.coloroButton +
                                      ' border-x-sky-500 border-y-sky-400 border-4'
                                    : style.coloroButton
                            }
                            onClick={() => {
                                setGroup({
                                    ...group,
                                    ['color']: color['hex'],
                                });
                            }}
                        ></button>
                    </div>
                );
            })}
        </fieldset>
    );
};

export default ColorSelector;
