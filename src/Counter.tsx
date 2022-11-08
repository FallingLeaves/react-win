import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "./store/counter";
import { useAppDispatch, useAppSelector } from "./hooks";

export function Counter() {
	const count = useAppSelector((state) => state.counter.value);
	const dispatch = useAppDispatch();

	return (
		<div>
			<div className="flex items-center">
				<button
					aria-label="Increment value"
					onClick={() => dispatch({type: "counter/increment"})}
				>
					Increment
				</button>
				<span>{count}</span>
				<button
					aria-label="Decrement value"
					onClick={() => dispatch(decrement())}
				>
					Decrement
				</button>
			</div>
		</div>
	);
}
