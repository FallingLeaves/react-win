import React, { useState } from "react";

export function LangSwitch() {
	const [lang, setLang] = useState("en");

	return (
		<div className="langSwitcher">
			<select value={lang} onChange={(e) => setLang(e.target.value)}>
				<option value="da">Danish</option>
				<option value="de">German</option>
				<option value="en">English</option>
				<option value="es">Spanish</option>
				<option value="fr">French</option>
				<option value="hi">Hindi</option>
				<option value="hu">Hungarian</option>
				<option value="ja">Japanese</option>
				<option value="ko">Korean</option>
				<option value="nl">Dutch</option>
				<option value="ru">Russian</option>
				<option value="tr">Turkish</option>
				<option value="zh">Chinese</option>
				<option value="si">Sinhala</option>
			</select>
		</div>
	);
}
