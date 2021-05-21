import React from 'react'
import initStoryShots, { Stories2SnapsConverter } from '@storybook/addon-storyshots';
import { create, act } from 'react-test-renderer';
import "regenerator-runtime/runtime";
import fetchMock from "jest-fetch-mock"

fetchMock.enableMocks()
fetch.mockResponse(JSON.stringify({ drinks: [] }))

const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount));

const converter = new Stories2SnapsConverter();

initStoryShots({
    asyncJest: true,
    test: async ({ story, context, done }) => {
        let renderer;
        act(() => {
            // React.createElement() is important because of hooks [shouldn't call story.render() directly]
            renderer = create(React.createElement(story.render), {
                // Fix Portal / MUI Dialog issues
                createNodeMock: (node) => document.createElement(node.type),
            });
        });

        // Let one render cycle pass before rendering snapshot
        await act(() => wait(0));

        // save each snapshot to a different file (similar to "multiSnapshotWithOptions")
        const snapshotFileName = converter.getSnapshotFileName(context);
        expect(renderer).toMatchSpecificSnapshot(snapshotFileName);

        done();
    },
});
