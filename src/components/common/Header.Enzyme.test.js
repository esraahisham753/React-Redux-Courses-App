import React from "react";
import Header from './Header';
import {shallow, mount} from 'enzyme';
import { MemoryRouter } from "react-router-dom";

it("Should render 3 nav links", () => {
    const header = shallow(<Header />);

    expect(header.find("NavLink").length).toBe(3);
});

it("Should contain 3 anchor tags", () => {
    const header = mount(
        <MemoryRouter>
            <Header />
        </MemoryRouter>
    );

    expect(header.find('a').length).toBe(3);
})
