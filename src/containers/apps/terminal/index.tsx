import React from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Toolbar } from "@/utils/general";

export const Terminal = () => {
	const termial = useAppSelector((state) => state.apps.terminal);
};
