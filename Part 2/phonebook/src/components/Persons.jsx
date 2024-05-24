const PersonRow = ({person, onDelete}) => (<tr>
    <td>{person.name}</td>
    <td>{person.number}</td>
    <td>
        <button onClick={() => onDelete(person)}>delete</button>
    </td>
</tr>)
const Persons = ({persons, filter, onDelete}) => (<table>
    <tbody>
    {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
        .map(person => <PersonRow key={person.name} person={person} onDelete={onDelete}/>)}
    </tbody>
</table>)

export default Persons