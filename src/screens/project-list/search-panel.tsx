/*
 * @Descripttion: test
 * @Date: 2021-04-26 16:42:15
 * @LastEditors: love-coding
 * @LastEditTime: 2021-04-27 13:43:49
 */
import React from 'react';
export interface User {
	id: string;
	name: string;
}
interface SearchPanelProps {
	param:{
		name: string;
		personId:string;
	},
	users: User[],
	setParam:(param:SearchPanelProps['param'])=>void;
}
export const SearchPanel = ({ param, users, setParam }:SearchPanelProps) => {
	return (
		<form>
			<div>
				<input
					type="text"
					value={param.name}
					onChange={(e) => {
						setParam({
							...param,
							name: e.target.value
						});
					}}
				/>
				<select
					value={param.personId}
					onChange={(e) =>
						setParam({
							...param,
							personId: e.target.value
						})}
				>
					<option value="">负责人</option>
					{users.map((user) => (
						<option value={user.id} key={user.id}>
							{user.name}
						</option>
					))}
				</select>
			</div>
		</form>
	);
};
