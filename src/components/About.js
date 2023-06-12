import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'

function About() {
    const a = useContext(noteContext)

    useEffect(() => {
        a.update();
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            this is about {a.state.name} and his character which is {a.state.character}
        </div>
    )
}

export default About