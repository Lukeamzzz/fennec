interface Props {
    onClick: () => void;
    loading?: boolean;
}

function ButtonPropertyEstimator({ onClick, loading }: Props) {
    if (loading) return null;

    return (
        <div className="pt-4 flex justify-center">
            <button
                type="button"
                onClick={onClick}
                disabled={loading}
                className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 disabled:opacity-50"
            >
                Estimar Valor
            </button>
        </div>
    );
}

export default ButtonPropertyEstimator;
