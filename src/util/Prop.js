import dat from 'dat.gui';

class Prop
{

	constructor(scene)
	{
		this.scene = scene;

		this.dat = new dat.GUI();

		this.folders = [];
	}

	addFolder(key)
	{
		if (!this.folders[key])
		{
			this.folders[key] = this.dat.addFolder(key);
		}

		return this.folders[key];
	}

}

export default Prop;
