import { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Modal, ModalTitle } from './Modal'
import { ExampleLoader } from './ExampleLoader'

export const Welcome = () => {
    const [isOpen, setIsOpen] = useState(true)

    const handleClose = useCallback(() => {
        setIsOpen(false)
    }, [setIsOpen])

    return (
        <>
            {isOpen && (
                <Modal onCloseRequest={handleClose} maxWidth={500}>
                    <ModalTitle>Welcome</ModalTitle>
                    <Message>
                        <p>
                            Welcome to the new nivo graph editor! This application is currently an
                            early prototype, so things might (and will) break ¯\_(ツ)_/¯, sorry for
                            that.
                        </p>
                        <p>
                            The motivation behind this project is to provide a way to visually
                            create charts, without code, allowing people without too much technical
                            background to easily use nivo charts.
                        </p>
                        <p>In order to get started, you can have a look at one of the example:</p>
                        <ExampleLoader onLoad={handleClose} />
                        <p>Otherwise, you can just start form scratch and craft your own chart.</p>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                margin: '12px 0',
                            }}
                        >
                            <span
                                onClick={handleClose}
                                style={{
                                    padding: '9px 12px',
                                    backgroundColor: '#000',
                                    borderRadius: '2px',
                                    cursor: 'pointer',
                                }}
                            >
                                Start from scratch
                            </span>
                        </div>
                        <p>
                            We hope you'll enjoy using this tool as much as we enjoy building it!
                            &lt;3
                        </p>
                    </Message>
                </Modal>
            )}
        </>
    )
}

const Message = styled.div`
    padding: 12px 12px 0;
    font-size: 12px;

    p {
        margin: 0 0 12px;
    }
`
