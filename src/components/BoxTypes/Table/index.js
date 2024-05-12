import React from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import Button from 'components/Button';
import withBox from 'components/Box';

createTheme('solarized', {
  striped: {
    default: '#f0efef',
  },
});

var icons = {
  collapsed: (
    <svg xmlns="http://www.w3.org/2000/svg" height="10px" viewBox="0 0 512 512" width="10px">
      <g>
        <script
          xmlns=""
          type="text/javascript"
          src="chrome-extension://gjdneabihbmcpobmfhcnljaojmgoihfk/js/vendor.js"
        />
        <path
          d="m304 512h-96c-17.679688 0-32-14.320312-32-32v-144h-144c-17.679688 0-32-14.320312-32-32v-96c0-17.679688 14.320312-32 32-32h144v-144c0-17.679688 14.320312-32 32-32h96c17.679688 0 32 14.320312 32 32v144h144c17.679688 0 32 14.320312 32 32v96c0 17.679688-14.320312 32-32 32h-144v144c0 17.679688-14.320312 32-32 32zm0 0"
          fill="#FB5252"
          data-original="#48C8EF"
          className="active-path"
          data-old_color="#48c8ef"
        />
      </g>{' '}
    </svg>
  ),
  expanded: (
    <svg xmlns="http://www.w3.org/2000/svg" height="10px" viewBox="0 -192 469.33333 469" width="10px">
      <g>
        <script
          xmlns=""
          type="text/javascript"
          src="chrome-extension://gjdneabihbmcpobmfhcnljaojmgoihfk/js/vendor.js"
        />
        <path
          d="m437.332031.167969h-405.332031c-17.664062 0-32 14.335937-32 32v21.332031c0 17.664062 14.335938 32 32 32h405.332031c17.664063 0 32-14.335938 32-32v-21.332031c0-17.664063-14.335937-32-32-32zm0 0"
          fill="#FB5252"
          data-original="#FFC107"
          className="active-path"
          data-old_color="#ffc107"
        />
      </g>{' '}
    </svg>
  ),
};

const columns = [
  {
    name: 'Title',
    selector: 'title',
    sortable: true,
  },
  {
    name: 'Director',
    selector: 'director',
    sortable: true,
  },
  {
    name: 'Year',
    selector: 'year',
    sortable: true,
  },
  {
    name: 'Status',
    selector: 'title',
    sortable: true,
    cell: row => <Button value="Pending" color="green" shape="oval" />,
  },
];

const customStyles = {
  headCells: {
    style: {
      fontSize: '14px',
      fontWeight: 800,
    },
  },
};

const data = [
  {
    id: 1,
    title: 'Beetlejuice',
    year: '1988',
    runtime: '92',
    genres: ['Comedy', 'Fantasy'],
    director: 'Tim Burton',
    actors: 'Alec Baldwin, Geena Davis, Annie McEnroe, Maurice Page',
    plot:
      'A couple of recently deceased ghosts contract the services of a "bio-exorcist" in order to remove the obnoxious new owners of their house.',
    posterUrl:
      'https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwODE3MDE0MV5BMl5BanBnXkFtZTgwNTk1MjI4MzE@._V1_SX300.jpg',
  },
  {
    id: 2,
    title: 'The Cotton Club',
    year: '1984',
    runtime: '127',
    genres: ['Crime', 'Drama', 'Music'],
    director: 'Francis Ford Coppola',
    actors: 'Richard Gere, Gregory Hines, Diane Lane, Lonette McKee',
    plot:
      'The Cotton Club was a famous night club in Harlem. The story follows the people that visited the club, those that ran it, and is peppered with the Jazz music that made it so famous.',
    posterUrl:
      'https://images-na.ssl-images-amazon.com/images/M/MV5BMTU5ODAyNzA4OV5BMl5BanBnXkFtZTcwNzYwNTIzNA@@._V1_SX300.jpg',
  }
];

const Table = () => {
  return (
    <div className="col-md-8">
      <DataTable
        theme="solarized"
        columns={columns}
        data={data}
        expandableRows="true"
        expandOnRowClicked="true"
        pagination="true"
        highlightOnHover="true"
        striped="true"
        pointerOnHover="true"
        expandableIcon={icons}
        customStyles={customStyles}
      />
      <style>{`
       

      `}</style>
    </div>
  );
};

export default withBox(Table);
