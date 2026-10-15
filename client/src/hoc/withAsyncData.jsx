import { useAsync } from "../hooks/useAsync.js";

/**
 * Higher-order component that wraps a presentational component with async data
 * loading. It runs `fetcher(props)`, then renders loading / error / empty states
 * centrally and passes the resolved `data` to the wrapped component. Keeps every
 * data page DRY — no repeated loading/error boilerplate.
 *
 * @param {Function} Wrapped        component that receives { data, ...props }
 * @param {Object}   options
 * @param {Function} options.fetcher   (props) => Promise
 * @param {Function} options.getDeps   (props) => any[]  dependency array
 * @param {Function} options.isEmpty   (data) => boolean
 * @param {string}   options.emptyMessage
 */
export function withAsyncData(Wrapped, options = {}) {
  const {
    fetcher,
    getDeps = () => [],
    isEmpty = () => false,
    emptyMessage = "Nothing to show.",
  } = options;

  function WithAsyncData(props) {
    const { data, loading, error } = useAsync(
      () => fetcher(props),
      getDeps(props)
    );

    if (loading) return <p className="home-msg">Loading…</p>;
    if (error)
      return (
        <p className="home-msg home-err">Failed to load: {error.message}</p>
      );
    if (isEmpty(data))
      return <p className="home-msg">{emptyMessage}</p>;

    return <Wrapped {...props} data={data} />;
  }

  WithAsyncData.displayName = `withAsyncData(${
    Wrapped.displayName || Wrapped.name || "Component"
  })`;

  return WithAsyncData;
}
