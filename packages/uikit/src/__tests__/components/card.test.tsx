import React from "react";
import { renderWithProvider } from "../../testHelpers";
import { Card, CardBody, CardHeader, CardFooter } from "../../components/Card";

it("renders correctly", () => {
  const { asFragment } = renderWithProvider(
    <Card>
      <CardHeader>Header</CardHeader>
      <CardBody>Body</CardBody>
      <CardFooter>Footer</CardFooter>
    </Card>
  );
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      .c0 {
      background: var(--colors-primary);
      border-radius: var(--radii-card);
      color: var(--colors-text);
      overflow: hidden;
      position: relative;
      padding: 2px 2px 2px 2px;
    }

    .c1 {
      width: 100%;
      height: 100%;
      overflow: inherit;
      background: var(--colors-primary);
      border-radius: var(--radii-card);
    }

    .c3 {
      padding: 24px;
    }

    .c2 {
      background: var(--colors-gradientCardHeader);
      border-radius: var(--radii-card) var(--radii-card) 0 0;
      padding: 24px;
    }

    .c4 {
      border-top: 1px solid var(--colors-cardBorder);
      padding: 24px;
    }

    <div
        class="c0"
      >
        <div
          class="c1"
        >
          <div
            class="c2"
          >
            Header
          </div>
          <div
            class="c3"
          >
            Body
          </div>
          <div
            class="c4"
          >
            Footer
          </div>
        </div>
      </div>
    </DocumentFragment>
  `);
});
