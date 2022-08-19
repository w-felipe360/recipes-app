export default function renderWithRouterAndRedux(component, options = {}) {
  const {
    initialPath = '/',
    history = createMemoryHistory([initialPath]),
  } = options;

  return {
    ...renderWithRedux(withRouter(component, history), options),
    history,
  };
}
