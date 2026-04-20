import EditContext from '@/context/EditContext';
import React, { useState, useContext, useEffect, use } from 'react';
import { Button, Tab, Tabs } from 'react-bootstrap';
import AppAccordion from '../AppAccordion';
import InputField from '../form/InputField';
import AppContext from '@/context/AppContext';
import { ubkgPredicates, SEARCH_SENOTYPE } from '@/config/search/senotype';
import { Skeleton } from 'antd';

function SenotypeForm() {
  const [key, setKey] = useState('main');
  const { senotype, senotypeOntologyPromise, senotypePredicates } =
    useContext(EditContext);
  const { ontology } = useContext(AppContext)
  const senotypeOntology = use(senotypeOntologyPromise);

  const [cellTypeOptions, setCellTypeOptions] = useState([])

  const getOptions = (predicate) => {
    const options = []
    if (predicate.ontologyKey) {
      for (const o in ontology[predicate.ontologyKey].terms) {
        options.push({
          value: ontology[predicate.ontologyKey].terms[o],
          label: o,
        });
      }
    } else if (predicate.field === 'gender') {
      return [
        {
          value: 'male',
          label: 'Male',
        },
        {
          value: 'female',
          label: 'Female',
        },
      ];
    } else {
      for (const o in senotypeOntology) {
        for (const b of senotypeOntology[o].aggregations.ontology?.buckets) {
          options.push({
            value: b.details?.hits?.hits[0]._source[o][0].code,
            label: b.key,
          });
        }
      }
    }
    return options
  }

  const getPredicates = () => {
    return [
      ...ubkgPredicates,
      {
        field: 'gender',
        label: 'Gender',
        ui: {}
      },
      ...senotypePredicates,
      {
        field: 'has_diagnosis',
        label: 'Diagnosis',
        ui: {
          tooltip:
            'Enter the exact name for the diagnosis from Disease Ontology (e.g. diabetes) or the diagnosis identifier (e.g., DOID:9351, 9351). Use the search button to go to the Disease Ontology site.',
        },
      },
    ];
  }

  const getSearchBehavior = (predicate) => {
    // TODO: resolve search behavior for cell types
    // resolve for Diagnosis
    if (predicate.field === 'has_cell_type') {
      return {
        showSearch: {
          filterOption: false,
          onSearch: (v) => log.info('InputField.Select', v),
        },
      };
    } 
    return {}
  }

  return (
    <>
      <h1 className="h2 mb-5">
        {senotype ? (
          <span>
            Edit <span className="text-muted">{senotype.sennet_id}</span>
          </span>
        ) : (
          'New'
        )}
      </h1>
      <Tabs
        id="senotypeForm--Tab"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="main" title="Submission">
          <AppAccordion title={'Basic'}>
            <InputField
              label={'Name'}
              controlProps={{
                defaultValue: senotype?.title,
                required: true,
              }}
            />
            <InputField
              label={'Description'}
              controlProps={{
                defaultValue: senotype?.definition,
                as: 'textarea',
                rows: 3,
              }}
            />
          </AppAccordion>
          <AppAccordion title={'Assertions'}>
            {!senotypeOntology && <Skeleton />}
            {senotypeOntology && (
              <>
                {getPredicates().map((p, index) => (
                  <InputField
                    key={p.field}
                    labelTooltip={p.ui.tooltip}
                    label={
                      p.label ||
                      SEARCH_SENOTYPE.searchQuery.facets[p.field]?.label
                    }
                    id={p.field}
                    selectData={getOptions(p)}
                    controlProps={{
                      ...getSearchBehavior(p),
                      defaultValue: senotype[p.field]
                        ? senotype[p.field][0]?.term
                        : undefined,
                      required: p.ui.required,
                    }}
                  />
                ))}
              </>
            )}
          </AppAccordion>
        </Tab>
        <Tab eventKey="metadata" title="Metadata">
          Tab content for Metadata
        </Tab>
        <Tab eventKey="markers" title="Markers">
          Tab content for Markers
        </Tab>
      </Tabs>
      <div className="c-senotypeForm__fotter mt-4 text-end">
        <Button>Submit</Button>
      </div>
    </>
  );
}

export default SenotypeForm;
