import React from 'react';
import Tree from 'react-d3-tree';
import './FamilyTree.css';


const exampleData = {
    name: 'CEO',
    children: [
        {
            name: 'Manager',
            attributes: {
                department: 'Production',
            },
            children: [
                {
                    name: 'Foreman',
                    attributes: {
                        department: 'Fabrication',
                    },
                    children: [
                        {
                            name: 'Worker',
                        },
                    ],
                },
                {
                    name: 'Foreman',
                    attributes: {
                        department: 'Assembly',
                    },
                    children: [
                        {
                            name: 'Worker',
                        },
                    ],
                },
            ],
        },
    ],
};


export class FamilyTree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.transform(this.props.data),
        };
    }

    render() {
        return (
            <div id="treeWrapper" style={{width: '50em', height: '30em'}} className='center' >
                <Tree data={this.state.data} pathFunc='step' orientation='vertical' translate={{x: 100, y: 50}} />
            </div>
        );
    }

    transform(data) {
        let target = data.targets[0];
        let target_id = target.id;
        let id_name = new Map();
        id_name.set(target_id, target.name);
        for (let x of data.people) {
            id_name.set(x.id, x.name);
        }
        let relations_filtered = data.relations.filter((x) => x.type === 'mother' || x.type === 'father');
        let target_map = get_child_parent(true);
        let res = generate_node(target_id);

        return res;

        function generate_node(id) {
            let target_ids = target_map.has(id) ? target_map.get(id) : [];
            let targets = target_ids.map((id) => (generate_node(id)));
            let res = {
                name: id_name.get(id),
                children: targets,
            };
            return res;
        }

        function get_child_parent(reverse=false) {
            let res = new Map();
            let v1 = 'person1Id';
            let v2 = 'person2Id';
            if (reverse) {
                [v1, v2] = [v2, v1];
            }
            for (let x of relations_filtered) {
                if (!res.has(x[v2])) {
                    res.set(x[v2], []);
                }
                let foo = res.get(x[v2]);
                foo.push(x[v1]);
                res.set(x[v2], foo);
            }
            return res;
        }

    }
}