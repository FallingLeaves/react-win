import { getCount, strip } from "./util";

interface Dir {
	type?: string;
	name?: string;
	info?: FileInfo;
	data?: {
		[key: string]: Dir;
	};
	// 类型有问题
	[key: string]: any;
}

interface ItemProps {
	type: string;
	name: string;
	info?: FileInfo;
	data?: Item[];
	host: Item | null;
}

export class Item {
	type: string;
	name: string;
	info: FileInfo;
	data: Item[];
	host: Item | null;
	id: string;

	constructor({ type, name, info, data, host }: ItemProps) {
		this.type = type || "folder";
		this.name = name;
		this.info = info || {};
		this.info.icon = this.info.icon || this.type;
		this.data = data || [];
		this.host = host;
		this.id = this.gene();
	}

	gene() {
		return Math.random().toString(36).substring(2, 10).toLowerCase();
	}

	getId() {
		return this.id;
	}

	getData() {
		return this.data;
	}

	setData(data: Item[]) {
		this.data = data;
	}
}

interface FileInfo {
	size?: string;
	used?: string;
	spid?: string;
	icon?: string;
}

interface BinTreeNode {
	type: string;
	name: string;
	info: FileInfo;
	host: Item | null;
	id: string;
	data: Item[];
}

interface Lookup {
	[key: string]: Item;
}

interface Special {
	[key: string]: string;
}

export class Bin {
	tree: Item[];
	lookup: Lookup;
	special: Special;

	constructor() {
		this.tree = [];
		this.lookup = {};
		this.special = {};
	}

	setSpecial(spid: string, id: string) {
		this.special[spid] = id;
	}

	setId(id: string, item: Item) {
		this.lookup[id] = item;
	}

	getId(id: string): Item | null {
		return this.lookup[id];
	}

	getPath(id: string) {
		let cpath: string = "";
		let curr = this.getId(id);

		while (curr) {
			cpath = curr.name + "\\" + cpath;
			curr = curr.host;
		}

		const num = getCount(cpath, "\\");
		return num > 1 ? strip(cpath, "\\") : cpath;
	}

	parsePath(cpath: string) {
		if (cpath.includes("%")) {
			return this.special[cpath.trim()];
		}

		let pathArr = cpath
			.split("\\")
			.filter((v) => v !== "")
			.map((v) => v.trim().toLowerCase());

		if (pathArr.length === 0) {
			return null;
		}

		let pid: string | null = null;
		let curr: BinTreeNode | null = null;
		for (let index = 0; index < this.tree.length; index++) {
			const item = this.tree[index];
			if (item.name.toLocaleLowerCase() === pathArr[0]) {
				curr = item;
				break;
			}
		}

		if (curr) {
			let i = 1;
			let j = pathArr.length;
			while (curr!.type === "folder" && i < j) {
				let res = true;
				for (let k = 0; k < curr!.data.length; k++) {
					const item: BinTreeNode = curr!.data[k];
					if (item.name.toLocaleLowerCase() === pathArr[i]) {
						i += 1;
						if (item.type === "folder") {
							res = false;
							curr = item;
						}
						break;
					}
				}
				if (res) {
					break;
				}
			}

			if (i === j) {
				pid = curr.id;
			}
		}

		return pid;
	}

	parseFolder(data: Dir, name: string, host: Item | null = null) {
		let item = new Item({
			type: data.type!,
			name: data.name || name,
			info: data.info,
			host: host,
		});
		this.setId(item.id, item);

		if (data.info && data.info.spid) {
			this.setSpecial(data.info.spid, item.id);
		}

		if (item.type !== "folder") {
			// item.setData(data.data);
		} else {
			let fdata: Item[] = [];
			if (data.data) {
				for (const key of Object.keys(data.data)) {
					fdata.push(this.parseFolder(data.data[key], key, item));
				}
			}
			item.setData(fdata);
		}

		return item;
	}

	parse(data: Dir) {
		let drives = Object.keys(data);
		let tree: Item[] = [];
		for (var i = 0; i < drives.length; i++) {
			tree.push(this.parseFolder(data[drives[i]], "", null));
		}

		this.tree = tree;
	}
}
