declare module 
'*.scss'
 {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames;
  export = classNames;
}


declare module 
'*.css'
 {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames;
  export = classNames;
}

declare module '*.svg' {
  const classNames: Record<string, string>;
  export default classNames;
}
declare module 'js-cookie';
