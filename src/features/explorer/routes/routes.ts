import ExplorerPage from "../pages/explorer/ExplorerPage.tsx";

export default [
    {
        path: '/',
        Component: ExplorerPage,
    },
    {
        path: '/directories/:id',
        Component: ExplorerPage,
    },
    {
        path: '/files/:id',
        Component: ExplorerPage,
    },
]
