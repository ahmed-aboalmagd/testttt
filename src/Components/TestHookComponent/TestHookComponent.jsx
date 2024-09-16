import useFetch from '../../hooks/useFetchHook/useFetch'

export default function TestHookComponent() {
  const { data, loading, error } = useFetch('https://cat-fact.herokuapp.com/facts');
  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>
  return (
    <>
      <ul>
        {data.map((fact) => {
          return <li key={fact._id}>{fact.text}</li>
        })}
      </ul>

    </>
  );
}

