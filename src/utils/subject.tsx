export class Observer {
	public update: Function = () => {};
}

export class Subject {
	private _observers = new ObserverList();

	addObserver(observer: Observer) {
		this._observers.add(observer);
	}

	removeObserver(observer: Observer) {
		this._observers.removeAt(this._observers.indexOf(observer, 0));
	}

	notify(context: any) {
		let observerCount = this._observers.count();
		for (let index = 0; index < observerCount; index++) {
			this._observers.get(index).update(context);
		}
	}
}

class ObserverList {
	private _observerList: Observer[] = [];

	add(obj: Observer) {
		return this._observerList.push(obj);
	}

	count() {
		return this._observerList.length;
	}

	get(index: number) {
		if (index > -1 && index < this._observerList.length) {
			return this._observerList[index];
		}

		throw new Error(`_observerList ${index} 未知`);
	}

	indexOf(obj: Observer, startIndex: number) {
		let i = startIndex;
		while (i < this._observerList.length) {
			if (this._observerList[i] === obj) {
				return i;
			}
			i++;
		}
		return -1;
	}

	removeAt(index: number) {
		this._observerList.splice(index, 1);
	}
}
