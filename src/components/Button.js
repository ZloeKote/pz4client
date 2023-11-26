import PropTypes from 'prop-types';
import className from 'classnames';
// twMerge використовуємо для перепису параметрів (наприклад, якщо кнопка primary, то білий колір тексту, а якщо і outline, то колір обводки)


function Button({
    children,
    primary,
    secondary,
    success,
    warning,
    danger,
    outline,
    rounded,
    ...rest
}) {
    const classes = className(rest.className, 'button-common', {
        'button-primary': primary,
        'button-secondary': secondary,
        'button-success': success,
        'button-warning': warning,
        'button-danger': danger,
        'rounded-full': rounded,
        'button-outline': outline,
        'button-outline-primary': outline && primary,
        'button-outline-secondary': outline && secondary,
        'button-outline-success': outline && success,
        'button-outline-warning': outline && warning,
        'button-outline-danger': outline && danger
    });

    return (
        <button {...rest} className={classes}>
            {children}
        </button>
    );
}

Button.propTypes = {
    children: PropTypes.string,
    checkButtonVariations: ({primary, secondary, success, warning, danger}) => {
        const count = Number(!!primary) + Number(!!secondary) + Number(!!success) + Number(!!warning) + Number(!!danger);
        if(count > 1) {
            return new Error("Only one of button variations must be applied");
        }
    }
}
export default Button;