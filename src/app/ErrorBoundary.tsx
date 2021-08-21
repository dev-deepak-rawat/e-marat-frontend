import React, { Component, ErrorInfo, ReactNode } from 'react';
import * as Sentry from '@sentry/react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    errorInfo?: ErrorInfo | null;
    error: '' | Error;
    eventId?: string;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            hasError: false,
            errorInfo: null,
            error: '',
        }
    }

    public static getDerivedStateFromError(_: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error: _ };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
        // Sentry.withScope((scope) => {
        //     scope.setExtra('errorInfo', errorInfo);
        //     const eventId = Sentry.captureException(error);
        //     this.setState({ eventId, errorInfo });
        // });
        this.setState({ errorInfo });
    }

    public render() {
        const { hasError, errorInfo } = this.state;
        if (hasError) {
            return (
                <div className="card my-5">
                    <div className="card-header">
                        <p>
                            There was an error in loading this page.{' '}
                            <button
                                type="button"
                                style={{ cursor: 'pointer', color: '#0077FF' }}
                                onClick={() => {
                                    window.location.reload();
                                }}
                            >
                                Reload this page
                            </button>{' '}
                        </p>
                    </div>
                    <div className="card-body">
                        <details className="error-details">
                            <summary>Click for error details</summary>
                            {errorInfo && errorInfo.componentStack.toString()}
                        </details>
                    </div>
                    <button
                        type="button"
                        className="bg-primary text-light"
                        onClick={() =>
                            Sentry.showReportDialog({
                                eventId: this.state.eventId,
                            })
                        }
                    >
                        Report feedback
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
