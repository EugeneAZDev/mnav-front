import css from './Button.module.css'

const Button = ({ children, narrow, ...props }) => {
  const classNames = [css.button]

  if (narrow) {
    classNames.push(css['button-narrow'])
  }

  return (
    <button {...props} className={classNames.join(' ')}>
      {children}
    </button>
  )
}

export default Button
