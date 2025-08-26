// This file handles the display of error overlays during development.

const ErrorOverlay = () => {
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        const handleError = (event) => {
            setError(event.error);
        };

        window.addEventListener('error', handleError);

        return () => {
            window.removeEventListener('error', handleError);
        };
    }, []);

    if (!error) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 0, 0, 0.8)',
            color: 'white',
            padding: '20px',
            zIndex: 9999,
        }}>
            <h1>Error Occurred</h1>
            <pre>{error.message}</pre>
        </div>
    );
};

export default ErrorOverlay;