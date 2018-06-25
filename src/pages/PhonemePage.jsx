import React from 'react'
import { Table } from 'semantic-ui-react'

const TableExampleDefinition = () => (
  <Table definition collapsing celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell />
        <Table.HeaderCell textAlign='center'>Labial</Table.HeaderCell>
        <Table.HeaderCell textAlign='center'>Alveolar</Table.HeaderCell>
        <Table.HeaderCell textAlign='center'>Retroflex</Table.HeaderCell>
        <Table.HeaderCell textAlign='center'>Palatal</Table.HeaderCell>
        <Table.HeaderCell textAlign='center'>Velar</Table.HeaderCell>
        <Table.HeaderCell textAlign='center'>Uvular</Table.HeaderCell>
        <Table.HeaderCell textAlign='center'>Glottal</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell textAlign='center'>Nasal</Table.Cell>
        <Table.Cell textAlign='center'>m</Table.Cell>
        <Table.Cell textAlign='center'>n</Table.Cell>
        <Table.Cell textAlign='center'></Table.Cell>
        <Table.Cell textAlign='center'></Table.Cell>
        <Table.Cell textAlign='center'>ŋ</Table.Cell>
        <Table.Cell textAlign='center'></Table.Cell>
        <Table.Cell textAlign='center'></Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell textAlign='center'>Plosive</Table.Cell>
        <Table.Cell textAlign='center'>p b</Table.Cell>
        <Table.Cell textAlign='center'>t d</Table.Cell>
        <Table.Cell textAlign='center'></Table.Cell>
        <Table.Cell textAlign='center'></Table.Cell>
        <Table.Cell textAlign='center'>k ɡ</Table.Cell>
        <Table.Cell textAlign='center'>q</Table.Cell>
        <Table.Cell textAlign='center'></Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell textAlign='center'>Sibilant Fricative</Table.Cell>
        <Table.Cell textAlign='center'></Table.Cell>
        <Table.Cell textAlign='center'>s z</Table.Cell>
        <Table.Cell textAlign='center'>ʂ ʐ</Table.Cell>
        <Table.Cell textAlign='center'>ɕ</Table.Cell>
        <Table.Cell textAlign='center'></Table.Cell>
        <Table.Cell textAlign='center'></Table.Cell>
        <Table.Cell textAlign='center'></Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell textAlign='center'>Non-sibilant Fricative</Table.Cell>
        <Table.Cell textAlign='center'>f v</Table.Cell>
        <Table.Cell textAlign='center'>θ ð</Table.Cell>
        <Table.Cell textAlign='center'></Table.Cell>
        <Table.Cell textAlign='center'></Table.Cell>
        <Table.Cell textAlign='center'></Table.Cell>
        <Table.Cell textAlign='center'>χ ʁ</Table.Cell>
        <Table.Cell textAlign='center'>h</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell textAlign='center'>Trill</Table.Cell>
        <Table.Cell textAlign='center'></Table.Cell>
        <Table.Cell textAlign='center'>r</Table.Cell>
        <Table.Cell textAlign='center'></Table.Cell>
        <Table.Cell textAlign='center'></Table.Cell>
        <Table.Cell textAlign='center'></Table.Cell>
        <Table.Cell textAlign='center'></Table.Cell>
        <Table.Cell textAlign='center'></Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell textAlign='center'>Approximant</Table.Cell>
        <Table.Cell textAlign='center'></Table.Cell>
        <Table.Cell textAlign='center'>l</Table.Cell>
        <Table.Cell textAlign='center'></Table.Cell>
        <Table.Cell textAlign='center'>j</Table.Cell>
        <Table.Cell textAlign='center'>w</Table.Cell>
        <Table.Cell textAlign='center'></Table.Cell>
        <Table.Cell textAlign='center'></Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
)

export default TableExampleDefinition