import styles from './DataTable.module.css'

const getBadgeClass = (status, type) => {
  if (type === 'lead') {
    switch (status) {
      case 'new':
        return 'badge-info'
      case 'contacted':
        return 'badge-warning'
      case 'qualified':
        return 'badge-success'
      case 'lost':
        return 'badge-danger'
      default:
        return 'badge-info'
    }
  } else if (type === 'task') {
    switch (status) {
      case 'pending':
        return 'badge-warning'
      case 'in-progress':
        return 'badge-info'
      case 'completed':
        return 'badge-success'
      default:
        return 'badge-warning'
    }
  } else if (type === 'priority') {
    switch (status) {
      case 'low':
        return 'badge-info'
      case 'medium':
        return 'badge-warning'
      case 'high':
        return 'badge-danger'
      default:
        return 'badge-info'
    }
  }
  return 'badge-info'
}

const formatDate = (dateString) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export const DataTable = ({ title, columns, data, onDelete }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.tableWrapper}>
        <table>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}
              {onDelete && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((row, idx) => (
                <tr key={row._id || idx}>
                  {columns.map((col) => {
                    let content = row[col.key]

                    if (col.type === 'badge') {
                      const badgeClass = getBadgeClass(
                        content,
                        col.badgeType || 'lead'
                      )
                      const label =
                        content.charAt(0).toUpperCase() + content.slice(1)
                      return (
                        <td key={col.key}>
                          <span className={`badge ${badgeClass}`}>{label}</span>
                        </td>
                      )
                    } else if (col.type === 'date') {
                      return <td key={col.key}>{formatDate(content)}</td>
                    } else if (col.type === 'reference') {
                      return (
                        <td key={col.key}>
                          {content ? content[col.refField] || '-' : '-'}
                        </td>
                      )
                    }

                    return <td key={col.key}>{content || '-'}</td>
                  })}
                  {onDelete && (
                    <td>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => onDelete(row._id)}
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + (onDelete ? 1 : 0)}
                  style={{ textAlign: 'center', padding: '32px' }}
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
