import 'material-symbols'
export default function ListCheck({listText,className}) {
    return (
        <li className={className}>
            <span className='material-symbols-rounded align-middle text-primary fs-4 me-3'>
                check_circle
            </span>
            {listText}
        </li>
    );
}